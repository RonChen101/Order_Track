import express from 'express'
import { open } from 'fs/promises'

const router = express.Router()

class model_derivative_api {
    access_token: string = ''
    upload_key: string = ''
    content_upload_signed_url: string = ''
    t4_oss_encoded_source_file_urn: string = ''
    // 前端需要的就是这个
    t4_url_safe_urn_of_source: string = ''

    get_access_token = async () => {
        const client_id = process.env.client_id
        const client_secret = process.env.client_secret
        const client_auth_keys = Buffer.from(client_id + ':' + client_secret, 'utf8').toString('base64')

        const res = await fetch('https://developer.api.autodesk.com/authentication/v2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                'Authorization': `Basic ${client_auth_keys}`
            },
            body: 'grant_type=client_credentials&scope=code:all data:write data:read bucket:create bucket:delete bucket:read'
        })

        const body = await res.json()
        this.access_token = body.access_token
    }

    obtain_signed_url = async () => {
        const oss_bucket_key = process.env.oss_bucket_key
        const oss_source_file_object_key = process.env.oss_source_file_object_key

        const res = await fetch(`https://developer.api.autodesk.com/oss/v2/buckets/${oss_bucket_key}/objects/${oss_source_file_object_key}/signeds3upload?minutesExpiration=5`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this.access_token}`
            }
        })

        const body = await res.json()
        this.upload_key = body.uploadKey
        this.content_upload_signed_url = body.urls[0]
    }

    upload_the_file = async (file_path: string) => {
        const file_handle = await open(file_path, 'r')
        const file = await file_handle.readFile()
        file_handle.close()

        await fetch(this.content_upload_signed_url, {
            method: 'PUT',
            body: file
        })
    }

    finalize_upload = async () => {
        const oss_bucket_key = process.env.oss_bucket_key
        const oss_source_file_object_key = process.env.oss_source_file_object_key

        const res = await fetch(`https://developer.api.autodesk.com/oss/v2/buckets/${oss_bucket_key}/objects/${oss_source_file_object_key}/signeds3upload`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.access_token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'uploadKey': this.upload_key })
        })

        const body = await res.json()
        const encoded_urn = btoa(body['objectId'])
        this.t4_oss_encoded_source_file_urn = encoded_urn
    }

    start_a_translation_job = async () => {
        const res = await fetch('https://developer.api.autodesk.com/modelderivative/v2/designdata/job', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.access_token}`,
                'x-ads-force': 'true'
            },
            body: JSON.stringify({
                'input': {
                    'urn': `${this.t4_oss_encoded_source_file_urn}`,
                    'rootFilename': 'test.dwg',
                    'compressedUrn': true
                },
                'output': {
                    'destination': {
                        'region': 'us'
                    },
                    'formats': [
                        {
                            'type': 'svf2',
                            'views': [
                                '2d',
                                '3d'
                            ]
                        }
                    ]
                }
            })
        })

        const body = await res.json()
        this.t4_url_safe_urn_of_source = body['urn']
    }

    check_status_of_job = async () => {
        await new Promise(resolve => setTimeout(resolve, 30000));

        const res = await fetch(`https://developer.api.autodesk.com/modelderivative/v2/designdata/${this.t4_url_safe_urn_of_source}/manifest`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this.access_token}`
            }
        })

        const body = await res.json()
        console.log(body)
    }

    start = async (file_path: string) => {
        await this.get_access_token()
        await this.obtain_signed_url()
        await this.upload_the_file(file_path)
        await this.finalize_upload()
        await this.start_a_translation_job()
        await this.check_status_of_job()
    }
}


export default model_derivative_api
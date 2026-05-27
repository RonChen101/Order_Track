import * as ForgeTypes from 'forge-viewer';

declare global {
    interface Window {
        Autodesk: typeof ForgeTypes.Autodesk;
        THREE: typeof ForgeTypes.THREE;
    }
}

export { };
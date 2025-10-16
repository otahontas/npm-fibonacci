import packageJson from "./package.json" with { type: 'json' }; 
export default Number(packageJson["version"].split(".")[0]);

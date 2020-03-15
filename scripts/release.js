const execa = require('execa');
const inquirer = require('inquirer');

const release = async () => {
  const curVersion = process.env.npm_package_version;
  const name = process.env.npm_package_name;
  console.log(`Current version: ${curVersion}`);

  const {platform} = await inquirer.prompt([
    {
      name: 'platform',
      message: '请选择打包平台:',
      type: 'list',
      choices: [
        {name: 'ios', value: 'ios'},
        {name: 'android', value: 'android'},
      ],
    },
  ]);

  const {
    appName,
    outputDir,
    description,
    deploymentName,
    mandatory,
    development,
  } = await inquirer.prompt([
    {
      name: 'appName',
      message: '请输入Code Push中应用名称:',
      type: 'input',
      default: `${name}-${platform}`,
    },
    {
      name: 'outputDir',
      message: '请输入打包后JS bundle包导出的位置(默认: bundles):',
      type: 'input',
      default: 'bundles',
    },
    {
      name: 'description',
      message: '更新描述:',
      type: 'input',
    },
    {
      name: 'deploymentName',
      message: '请选择发布更新的环境(默认: Staging):',
      type: 'list',
      choices: [
        {name: 'Staging', value: 'Staging'},
        {name: 'Production', value: 'Production'},
      ],
    },
    {
      name: 'mandatory',
      message: '是否开启强制更新(默认: false):',
      type: 'confirm',
      default: false,
    },
    {
      name: 'development',
      message: '是否开启JS的开发者模式(默认: true):',
      type: 'confirm',
      default: true,
    },
  ]);

  const {yes} = await inquirer.prompt([
    {
      name: 'yes',
      message: `确认发布 ${curVersion}吗?(默认: true)`,
      type: 'confirm',
      default: true,
    },
  ]);

  if (!yes) {
    console.log('[release] cancelled.');
    return;
  }

  const bundleName =
    platform === 'ios' ? 'main.jsbundle' : 'index.android.bundle';

  const bundleArguments = [
    'bundle',
    '--entry-file index.js',
    '--platform',
    platform,
    '--dev',
    development,
    '--bundle-output',
    `./${outputDir}/${bundleName}`,
    '--assets-dest',
    `./${outputDir}`,
  ];

  const releaseArguments = [
    'release',
    appName,
    `./${outputDir}/${bundleName}`,
    curVersion,
    '--des',
    description,
    '-d',
    deploymentName,
    '-m',
    mandatory,
  ];

  console.log(`react-native ${bundleArguments.join(' ')}`);
  console.log(`code-push ${releaseArguments.join(' ')}`);

  // react-native bundle --entry-file index.js --platform android --dev false --bundle-output ./bundles/index.android.bundle --assets-dest ./bundles
  // code-push release ReactNativeDemo-iOS ./bundles/main.jsbundle 1.0.0 -d Production
  await execa('react-native', bundleArguments, {stdio: 'inherit'});
  await execa('code-push', releaseArguments, {stdio: 'inherit'});
};

release().catch(err => {
  console.error(err);
  process.exit(1);
});

# react-native-trustkit-wrapper

A simple wrapper around [Trustkit](https://github.com/datatheorem/TrustKit) and [TrustKit-Android](https://github.com/datatheorem/TrustKit) for react-native.

## Prerequisites

A working react native project. Tested on react-native 0.44 and above
A working CocoaPods installation [CocoaPods - Getting Started](https://guides.cocoapods.org/using/getting-started.html)

## Installation
1. Install from npm  `npm install --save react-native-trustkit-wrapper` or `yarn add react-native-trustkit-wrapper`
2. Run `react-native link react-native-trustkit-wrapper` to link ios and android project

### installation iOS
1. Add TrustKit to your cocoapods configuration (PodFile) `pod 'TrustKit', '~> 1.4.2'`
2. Run `pod install` to install cocoapods dependencies

### installation Android 
1. Android support is not ready

# Usage
```js
import configureTrustKit from 'react-native-trustkit-wrapper';

configureTrustKit({
  TSKPinnedDomain: {
    'my.api.com': {
      TSKIncludeSubdomains: true,
      TSKEnforcePinning: true,
      TSKPublicKeyAlgorithms: [
        'TSKAlgorithmRsa2048',
        'TSKAlgorithmRsa4096',
      ],
      TSKPublicKeyHashes: [
        'HXXQgxueCIU5TTLHob/bPbwcKOKw6DkfsTWYHbxbqTY=',
        '0SDf3cRToyZJaMsoS17oF72VMavLxj/N7WBNasNuiR8=',
      ],
      TSKReportUris: [
        'https:/my.api.com/log_report',
      ],
    },
  },
  TSKSwizzleNetworkDelegates: true,
}).catch((err) => {
  if (err.code === 'trustkit_initialized') {
    console.warn('Trust kit configuration only changed when app re-launches');
  }
});

```


See the [TrustKit documentation] for more information

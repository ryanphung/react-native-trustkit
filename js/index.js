import {
  NativeModules,
  Platform,
} from 'react-native';
import Ajv from 'ajv';

const ajv = new Ajv({});

const iosValidate = ajv.compile({
  title: 'TrustKitConfiguration',
  type: 'object',
  properties: {
    TSKSwizzleNetworkDelegates: {
      type: 'boolean',
    },
    TSKPinnedDomain: {
      type: 'object',
      patternProperties: {
        '^.*$': {
          type: 'object',
          properties: {
            TSKPublicKeyAlgorithms: {
              type: 'array',
              items: {
                enum: ['TSKAlgorithmRsa2048', 'TSKAlgorithmRsa4096'],
              },
            },
            TSKPublicKeyHashes: {
              type: 'array',
              items: {
                oneOf: [
                  { type: 'string' },
                ],
              },
            },
            TSKIncludeSubdomains: {
              type: 'boolean',
            },
            TSKEnforcePinning: {
              type: 'boolean',
            },
            TSKReportUris: {
              type: 'array',
              items: {
                oneOf: [
                  { type: 'string' },
                ],
              },
            },
          },
        },
      },
    },
  },
});

export default (configuration) => {
  const { RNTrustKitPlugin } = NativeModules;
  return new Promise((resolve, reject) => {
    if (Platform.OS === 'android') {
      resolve(RNTrustKitPlugin.configure());
    } else if (Platform.OS === 'ios') {
      if (configuration && iosValidate(configuration)) {
        resolve(RNTrustKitPlugin.configure(configuration));
      } else if (!configuration) {
        resolve(RNTrustKitPlugin.configure());
      } else {
        reject(new Error('Configuration not valid'));
      }
    }
  });
};

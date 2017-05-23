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
    SwizzleNetworkDelegates: {
      type: 'boolean',
    },
    PinnedDomain: {
      type: 'object',
      patternProperties: {
        '^.*$': {
          type: 'object',
          properties: {
            PublicKeyAlgorithms: {
              type: 'array',
              minItems: 1,
              items: {
                enum: ['AlgorithmRsa2048', 'AlgorithmRsa4096'],
              },
            },
            PublicKeyHashes: {
              type: 'array',
              minItems: 2,
              items: {
                oneOf: [
                  { type: 'string' },
                ],
              },
            },
            IncludeSubdomains: {
              type: 'boolean',
            },
            EnforcePinning: {
              type: 'boolean',
            },
            ReportUris: {
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
      reject(new Error('Android not currently supported'));
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

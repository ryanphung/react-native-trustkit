import {
  NativeModules,
} from 'react-native';
import Ajv from 'ajv';

const ajv = new Ajv({ allErrors: true, jsonPointers: true });

const validate = ajv.compile({
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
                oneOf: [
                  { type: 'string' },
                ],
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
  if (validate(configuration)) {
    NativeModules.configure(configuration);
  }
  else {
    throw new Error('Configuration not valid');
  }

};

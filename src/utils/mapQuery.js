/**
 * @param args
 * {
 *   booleanValue: true,
 *   stringValue: 'string',
 *   idValue: 'VmFjYW5jeTozNzM=',
 *   encoded: 'value&='
 * }
 * @param config
 * {
 *   booleanValue: { type: 'bool' },
 *   stringValue: { type: 'string', name: 'value' },
 *   encoded: { type: 'encodedString' }
 *   idValue: { type: 'id', name: 'valueId' }
 * }
 *
 * returns booleanValue=true&value=string&valueId=373&encoded=%D0%97%D0%BD%D0%B0%D1%87%D0%B5%D0%BD%D0%B8%D0%B5%26%3D
 */

export default function mapQuery(args, config) {
  let sort = '';

  if (config.sort) {
    sort = `sort=${
      (config.sort.map((elem) =>
        `${elem.field},${elem.type}`
      ).join('&'))
    }&`;
  }

  return sort + Object.keys(args).map((key) => {
    if (config[key]) {
      if (config[key].ignoreEmpty && args[key] === '') return null;

      const name = `${(config[key].name) ? config[key].name : key}=`;

      switch (config[key].type) {
        case 'id':
          return name + args[key];
        case 'encodedString':
          return name + encodeURIComponent(args[key]);
        case 'isoDate':
          return name + (new Date(args[key])).toISOString();
        case 'bool':
        case 'string':
        default:
          return name + args[key];
      }
    }
  }).filter(item => item).join('&');
}

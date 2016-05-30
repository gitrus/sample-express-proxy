export default function template() {
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title></title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,300,500&subset=latin,cyrillic" />
    <style>
      table td, table th {
        border: 1px solid #cccccc;
        padding: 0.3em;
      }
    </style>
  </head>
  <body>
    <header>
      <h1>API</h1>
    </header>
    <main>
      <table>
        <tbody>
          <tr>
            <th>url</th>
            <th>Description</th>
          </tr>
          <tr>
            <td>/data/:entity</td>
            <td>request to configured backend:url/api/:entity </td>
          </tr>
          <tr>
            <td>/files/:key</td>
            <td> streaming request to configured backend:url/api/files/:key</td>
          </tr>
        </tbody>
      </table>
    </main>
  </body>
</html>
`;
}

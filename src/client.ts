import axios, { AxiosError } from 'axios';
import config from 'config';

const serverUrl = `${config.get("host")}/app/`;

async function sendRequest(command: string, method: string, dataStr: string, param: string = '', Authorization: string = ''): Promise<void> {
	const data = JSON.parse(dataStr.replace(/\\/g, '"'));

  await axios.request({
    url: `${serverUrl}${command}${param ? `/${param}` : ''}`,
		method,
		data,
		headers: {
			Authorization
		}
  })
	.then(res => {
		console.log(res.data)
	})
	.catch((e: AxiosError) => {
		console.log('Error:', e.message, '\n', e.response?.data ?? {});
	})
}

async function main() {
	const [command, ...params] = process.argv.slice(2);

  switch (command) {
    case 'create':
      await sendRequest('cars', 'post', params[0]);
      break;
		
		case 'get':
			await sendRequest('cars', 'get', params[0]);
			break;

    case 'update':
			await sendRequest('cars', 'put', params[0], params[1]);
      break;

		case 'delete':
			await sendRequest('cars', 'delete', '{}', params[0]);
			break;

    case 'authorize':
			await sendRequest('authorize', 'get', '{}', '', `Basic ${Buffer.from(params[0]).toString('base64')}`);
      break;

    default:
      console.error('Invalid command. Use "get", "create", "update", "delete".');
  }
}

main();
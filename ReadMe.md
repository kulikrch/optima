## Optima
Создание серверного и клиентского приложения

Конфиг default.json:  
```
{  
  "host": "http://localhost:port",  
  "port": ,  
	"dbUrl": "",  
	"users": {  
		"admin": "adminpassword",  
		"user": "userpassword"  
	}  
}
```

Запуск серверного: npm run start  

Запуск клиентсого ```npm run start_client```, примеры параметров:
```
authorize admin:adminpasswod

delete 65a1a9a04721bc66637ad31a

update '{\\"brand\\":\\"mersss\\"}' 65a1a9a04721bc66637ad31a

get '{\\"brand\\":\\"mers\\",\\"sortBy\\":{\\"year\\":-1}}'
```

Запуск тестов: ```npm run test```
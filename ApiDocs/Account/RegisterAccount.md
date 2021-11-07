# Creating an Account
To create an account, messages must be sent to the channel `account:register`

## Message Body
```json
{
	"UserName": "Account UserName",
	"DisplayName": "Account DisplayName",
	"Email": "Primary Email Address",
	"Password": "Account Password"
}
```

## Posible Responses

## Success
Channel: `account:register _reply:success`

### Reply Body
```json
{
	"Token": "Account Token"
}
```
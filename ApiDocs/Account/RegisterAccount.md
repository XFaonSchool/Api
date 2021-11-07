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
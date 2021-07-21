
# 🏗️ Project Erwin Morel to discover CDK


Configure your aws
```
aws configure
```  
```
[default]
region=eu-west-1
```
```
[default]
aws_access_key_id=YOUR_AWS_ACESS_KEY_ID
aws_secret_access_key=YOUR_AWS_SECRET_ACCES_KEY
```
Install CDK
```
npm install -g aws-cdk
```
Check if you have install CDK
```
cdk --version
```
Bootstrap
```
cdk bootstrap aws://ACCOUNT-NUMBER/REGION
```

You can check your modificcation if you run this:
```
cdk diff
```

You can push your modification in your account AWS if you run this:
```
cdk deploy
```
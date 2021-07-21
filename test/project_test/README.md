
# 🏗️ Project Erwin Morel to discover CDK

> The next generation tool for real estate developer

Collaboration tool for real estate developer to do everything in one place with all stakeholders

## 🛠 Prerequisites ##
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
- [NodeJS](https://nodejs.org/en/download/)
- [AWS Profile configured](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html)
- [AWS CDK](https://docs.aws.amazon.com/cdk/latest/guide/getting_started.html#getting_started_install)


## 🚀 Deploy Stacks ##

Install dependencies
```
make install
```  

Deploy
```
make deploy AWS_PROFILE=<aws_profile> CUSTOMER_ID=<customer_id>
``` 
# Ghost-Azure 

## Why Ghost-Azure?
Straight out of the box, the current versions of Ghost aren't compatible with Azure App Service. *Ghost-Azure* resolves this by providing a production-ready template that can be hosted directly on Azure App Service (on Windows). 

Note: This project hasn't introduced any changes to the original source code of Ghost. 

## Demo
[![Status of Demo deployment](https://vsrm.dev.azure.com/RG-GitHub/_apis/public/Release/badge/72c85fbd-8b34-4db0-8be1-f1a286cc4d59/3/4)](https://dev.azure.com/RG-GitHub/Ghost-Azure/_release?definitionId=3)

You can play with the demo web app: https://ghost-azure-demo.azurewebsites.net. Just give it some time to warm up. It runs on the Free plan of Azure App Service and most of the time stays unloaded from memory.

## Installation methods

I suggest forking this repository into your own to avoid changes I make to this repository that may negatively impact your installation.

### One-click deploy

[![Deploy to Azure](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FRadoslavGatev%2FGhost-Azure%2Fazure%2Fazuredeploy.json)
[![Visualize](https://raw.githubusercontent.com/RadoslavGatev/Ghost-Release-Uploader/master/images/visualizebutton.svg?sanitize=true)](http://armviz.io/#/?load=https%3A%2F%2Fraw.githubusercontent.com%2FRadoslavGatev%2FGhost-Azure%2Fazure%2Fazuredeploy.json)

### Azure App Service Deployment Center

More info on [Microsoft Docs](https://docs.microsoft.com/en-us/azure/app-service/deploy-continuous-deployment#deploy-continuously-from-github)

## Contributing to the project

Feedback with improvements and pull requests from the community will be highly appreciated and accepted.

Please open Pull requests only in the [Ghost-Release-Uploader repository](https://github.com/RadoslavGatev/Ghost-Release-Uploader) as commits to Ghost-Azure are fully automated by Azure DevOps Pipelines that merges the original code from https://github.com/TryGhost/Ghost with the files needed for Azure App Service.

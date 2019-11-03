# Ghost-Azure 
## Why Ghost-Azure?
Straight out of the box, the current 1.x and 2.x versions of Ghost aren't compatible with the Azure App Service. Ghost-Azure resolves this by providing a production-ready template which can be hosted directly on Azure App Service. In the background, an Azure Function ([Ghost-Release-Uploader](https://github.com/RadoslavGatev/Ghost-Release-Uploader)) makes sure that this repository stays up-to-date with the latest releases of Ghost.

## Demo
[![Status of Demo deployment](https://vsrm.dev.azure.com/RG-GitHub/_apis/public/Release/badge/72c85fbd-8b34-4db0-8be1-f1a286cc4d59/3/4)](https://dev.azure.com/RG-GitHub/Ghost-Azure/_release?definitionId=3)

You can play with the demo web app: https://ghost-azure-demo.azurewebsites.net. Just give it some time to warm up.

## Installation methods
I suggest forking this repository into your own to avoid changes I make to my repository to negatively impact your installation.

### One-click deploy
[![Deploy to Azure](https://azuredeploy.net/deploybutton.png)](https://azuredeploy.net/)
[![Visualize](http://armviz.io/visualizebutton.png)](http://armviz.io/#/?load=https%3A%2F%2Fraw.githubusercontent.com%2FRadoslavGatev%2FGhost-Azure%2Fazure%2Fazuredeploy.json)
[Deploy to Azure via Portal](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FRadoslavGatev%2FGhost-Azure%2Fazure%2Fazuredeploy.json)

### Azure App Service Deployment Center
More info on [Microsoft Docs](https://docs.microsoft.com/en-us/azure/app-service/deploy-continuous-deployment#deploy-continuously-from-github)

## Contributing to the project
Feedback with improvements and pull requests from the community will be highly appreciated and accepted.
Please open Pull requests only in the [Ghost-Release-Uploader repository](https://github.com/RadoslavGatev/Ghost-Release-Uploader) as commits to Ghost-Azure are fully automated by it.

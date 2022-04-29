# les commandes git :
##  initialiser les donnees pesonnels
````git
git config --global user.name "mon nom"
git config --global user.email mon_email@gmail.com
````
## verifier:
````
 git config --list
````
*********************************************************************************
### initialiser un dossier: 
````
git init
````
### ajouter un remote:
````
	git remote add myRemote https://github.com/abdennour-g/myproject.git   
```` 
### supprimer un remote:
````
	git remote rm myRemote
````
### ajouter le contenu dans le dossier .git en local :
````
	git add .
	git commit -m "un petit commentaire"
````
### nouvelle branche :
````
git branch myBransh
````
### acceder à cette branche:
````
git checkout myBransh
````
### acceder à une branche ou la créer si elle est inexistante :
````
git checkout -b myBransh
````
#### exportation vers le serveur :
````
	git push -u myRemote myBransh
````
### après la configuration il suffit ces commandes pour envoyer la mise à jour :
````
git add .
git commit -m "un commentaire"
git push
````

----------------------------------------------------------------
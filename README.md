# FrontendAPURSP2018

* Preuzimanje projekta

Za početak, potrebno je instalirati Git na računaru, link za preuzimanje instalacije je: https://git-scm.com/download/win
Kako bi klonirali projekat sa GitHub-a, potrebno je učiniti sledeće korake:
1.	Otvoriti Command Prompt
2.	Napraviti folder na Desktopu pod nekim nazivom, i u Command Promptu se pozicionirati na njega.
3.	Potom treba u Cmd Promptu pokrenuti: 
git clone https://github.com/RPPIIM/FrontendAPURSP2018.git
Na taj način, projekat sa GitHub-a kloniran je u okviru foldera koji je napravljen.

* Pokretanje aplikacije

Kako bi aplikacija radila, potrebno je u integrisanom Terminalu VSC-a pokrenuti:
npm install 
ng serve 
i potom projekat pokrenuti na: localhost:4200 u Web Browser-u

* Komitovanje projekta

1.	U Cmd Promptu se pozicionirati na sam projekat koji je potrebno komitovati
2.	U Cmd Promptu treba pokrenuti: 
git add .
3.	Ukoliko ne prepoznaje korisnika potrebno je pokrenuti: 
git config --global user.email "email@example.com" 
git config --global user.name "Your name"
4.	Nakon toga, u Cmd Promptu dodati i: 
git commit -m "Inicijalni commit"
5.	Potom, uraditi git pull, u slučaju da je neko drugi uradio git push, a u lokalnom repozitorijumu nema poslednje verzije projekta:
git pull origin master
6.	Na kraju, u Cmd Promptu pokrenuti: 
git push origin master

## CORS

Instalirati Chrome plugin: [CORS](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi)

dodati u **Intercepted URLs or URL patterns** sledeće URL-ove:

* http://localhost:8083/

* http://localhost:4200/

Omogućiti **Enable cross-origin resource sharing**

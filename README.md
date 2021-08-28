# SaveKiteEnctoken
### The Script Save KiteEnctoken to jsonbin.com, which can be used to synchronized Kite Enctoken between your local pc/laptop browser and Algo Trading Code at Remote Servers.

#### To set it up for the first time, you need to follow these steps. _(Once all the steps completed, from next login onwards it will work automatically)_
##### Browser Setup
1. Go to https://jsonbin.io/login ans signup wth your gmail/github/facebook/twitter account.
![image](https://user-images.githubusercontent.com/68828793/131208460-3f285490-3bbd-499e-bd7b-2f1f61ff6fed.png)
2. Now Click on Create New
![image](https://user-images.githubusercontent.com/68828793/131208856-97fa70f2-77ca-4cc7-ad87-a1d5d956a431.png)
3. Now Type ```{"enctoken":"abcdefghijklmnopqrstuvwxyz"}``` in the text box and click create.
![image](https://user-images.githubusercontent.com/68828793/131209433-63099f13-f5e4-42d1-9c74-4047da515742.png)
4. Now Click on the Profile Picture, Then Click on Dashboard
![image](https://user-images.githubusercontent.com/68828793/131209203-6aa0441d-c19b-4ec3-961b-39eeac656af1.png)
5. Now Copy the 24 Charachter long BIN_ID and save it on a notepad as ```BIN_ID = <PASTE 24 Charachter BIN_ID HERE>``` _(For Example in this case it shall be ```BIN_ID = 6129d9bd2aa800361271257f```)_
![image](https://user-images.githubusercontent.com/68828793/131209297-a7b875f8-2ec2-42da-9044-6a054aead814.png)
6. Now Click on the VIEW MASTER KEY
![image](https://user-images.githubusercontent.com/68828793/131209475-51ddefbc-a2f1-4a2a-9919-06fd7aa334c3.png)
7. And Copy the 60 Character long Master Key by clicking on COPY KEY and save it on a notepad as ```YOUR_API_KEY = <PASTE 60 Charachter Master Key HERE>``` _(For Example in this case it shall be ```YOUR_API_KEY = $2b$10$IIWfEN3l97/jWpsxjBli0eUQopUdqzt0Ksx9dl87xGINSKxCesLte```)_
![image](https://user-images.githubusercontent.com/68828793/131209510-d3c0858d-012f-4e4c-a506-b2e08152f12b.png)
8. Now You may close the jsonbin.io website and open https://www.tampermonkey.net/ and download for chrome/firefox/edge/safari _(whatever you use, In my case i will download for chrome)_ 
![image](https://user-images.githubusercontent.com/68828793/131209723-aa3063df-e071-44c6-be08-a0d3ea66c714.png)
![image](https://user-images.githubusercontent.com/68828793/131209778-e7055f23-665d-408b-ae10-c79dee6de27f.png)
9. Once TamperMonkey has been added to chrome click the extension button and find tampermonkey and click on pin so it should be visible
![image](https://user-images.githubusercontent.com/68828793/131209818-aba5dfba-7834-4a73-9d0e-a6bbc4b99545.png) ![image](https://user-images.githubusercontent.com/68828793/131209825-57738444-0078-4de9-a39e-d6f73fe4c76a.png)
10. Now open [SaveKiteEnctoken.user.js](https://github.com/TechfaneTechnologies/SaveKiteEnctoken/raw/main/SaveKiteEnctoken.user.js) and click Install when prompted
![image](https://user-images.githubusercontent.com/68828793/131209914-bdd5aadb-e4bb-4df5-a9cb-28f8c323b6e1.png)
11. Now Open https://kite.zerodha.com/ and you will see the TamperMonkey Icon has a red notification with 1 written on it.
![image](https://user-images.githubusercontent.com/68828793/131209959-6bba69d4-50e0-47a6-a571-83d597a21455.png)
12. Click on It, and then click on the setting below SaveKiteEnctoken
![image](https://user-images.githubusercontent.com/68828793/131209986-8f2f206c-d700-40b3-9ebc-d0eadf755da4.png)
13. Now Fill the _Your Api Key with the Master Key Saved in Point No. 7_ and _Bin id with the BIN ID saved in Point No.5_ and then click on save.
![image](https://user-images.githubusercontent.com/68828793/131210054-9ffa6bf8-90f2-489a-972a-fbc14418d981.png)
14. Now Login to kite as usual, and the enctoken will automatically be updated.

##### Python Program Modification for obtaining enctoken automatically.
```python
###############################################################################
import requests

def get_enctoken(YOUR_API_KEY, BIN_ID):
    enctoken_url = "https://api.jsonbin.io/v3/b/"+BIN_ID+"/latest"
    headers = {
        'X-Master-Key': YOUR_API_KEY
    }
    req = requests.get(enctoken_url, json=None, headers=headers)
    enctoken = req.json()['record']['enctoken']
    return enctoken

YOUR_API_KEY = <PASTE 60 Charachter Master Key HERE from Point No.7>
BIN_ID = <PASTE 24 Charachter BIN_ID HERE from point No. 5>
enctoken = get_enctoken(YOUR_API_KEY, BIN_ID)

#################################################################################
  # For Example in our case it will be
  # YOUR_API_KEY = "$2b$10$IIWfEN3l97/jWpsxjBli0eUQopUdqzt0Ksx9dl87xGINSKxCesLte"
  # BIN_ID = "6129d9bd2aa800361271257f"
  # enctoken = get_enctoken(YOUR_API_KEY, BIN_ID)
#################################################################################
```

15. Hence, For Example if you want to run your code from colab just do like this and it wont log you out of your browser session. _(and when your browser session expires and you relogin, the enctoken will automatically be updated and your algo code will work as intended without interruption)_
![image](https://user-images.githubusercontent.com/68828793/131210387-51e52d8f-784d-4909-8c25-843953f54ab4.png)

### Disclaimer: I have made this tool for my personal use and it may have bugs.

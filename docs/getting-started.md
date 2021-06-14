### Welcome

Welcome to Nodeblogger, a highly customizable Node.js platform to quickly and easily build your complete and selfhosted blog site.


### Installation

You can follow the installation instruction on [Nodeblogger Github Project](https://github.com/kortkamp/nodeblogger#technical)


### Configuring your Blog

#### User Account
- The first thing to do after you've installed Nodeblogger is to configure a new user account. To do so, go to [Admin area](http://localhost:3000/admin) or open you blog on browser and, in footer area, click **Admin**, 
- Then log in with user 'admin' and password 'admin'. 
- Once you reach to Dashboard area, go to **User Editor**
- Click **NEW** and fill your details on Data inputs.
- Click **SAVE** and you gonna see a new entry with your username in List Area.
- Now click **LOGOFF** and enter you username and password to log in. 
- If everything runs OK , go to **User Editor** , select old **admin** account and **DELETE** it
- Note that you can create as many users as your want

#### Blog Configuration
- Once you reach to Dashboard area, go to **Configuration**
- Here you gonna click on List, then '1 default' to select default config 'file'.
- Now click **EDIT** and set your Blog Name, Basic description and , blog e-mail.
- hen click  **SAVE**  and **Apply Configs**.

#### Writing Articles for your Blog
- Log in to dashboard and go to **Articles Editor**.
- Click **NEW** and fill tittle, description and author for the new Article.
- Dont forget to fill basic **KEYWORDS** to define your new Article. Those keywords gonna be listed in footer area of the Blog.
- Select allow_commentary true/false to accept or forbid commentaries on the article page.
- Select public true/false to make the article visible or not on main page.
- Select main_menu true/false if you want this article in Main Menu on blog's header area.
- type and status are not being used in currently version, so let then '0'
- views and likes must not be defined diferent than 0 when creating an Article as they represent the article stats.
- On TEXTAREA below, you gonna write your Article using Markdown Syntax.
- After finished, click **SAVE** and if you want to make you new post available on Blog click **Publish Article**. 
- If you already configured an Email service, a email will be sent to all subscribers of your blog telling then about a new Article on the Blog.
- If your want to make this article your homepage, click **Define Homepage**.







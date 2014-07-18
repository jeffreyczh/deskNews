deskNews
========

A simple and lightweight cross-platform desktop app that shows news as well as another information e.g. weather, date and currency rate.

![Screenshot](/screenshot/screenshot.gif "Screenshot")


##Applied Techniques

**AngularJS**, **Node-Webkit**

##Details

This is a simple desktop app that fetches and shows news, as well as weather and currency rate from Internet. It is cross-platform and can be run on any OS which supports [Node-Webkit](https://github.com/rogerwang/node-webkit).

The project is built under [Node-Webkit](https://github.com/rogerwang/node-webkit) to allow the app, which is written in HTML and JavaScript, to run on different platform as a desktop app. [Node.js](http://nodejs.org/) in this project is also used for accessing the local file system. [AngularJS](https://angularjs.org/) is applied for MVC implementation.

##How to run or package and distribute the app

Firstly, please have [Node.js](http://nodejs.org/) and [Node-Webkit](https://github.com/rogerwang/node-webkit) installed in your machine before continuing the following steps.

###Run the app with Node-Webkit

1. Zip all the files to a `.nw ` file:

    Linux:

        zip -r deskNews.nw *

    Windows:

    Zip all the files to a `.zip` file then rename the suffix to `.nw`
    
2. Use the **Node-Webkit** to open the generated `deskNews.nw` file:

    `./nw deskNews.nw`    
    
Note: on Windows, you can drag the `deskNews.nw` to `nw.exe` to open it.

###Package and distribute the app to an executable file

Linux:

    cat ./nw deskNews.nw > deskNews && chmod +x deskNews
    
Then, copy the `nw.pak` file from the **Node-Webkit** prebuild library to the folder where the new `deskNews` is in.

Windows:

    copy /b nw.exe+deskNews.nw deskNews.exe
    
Then copy the `nw.pak` and `icudt.dll` from the **Node-Webkit** prebuild library to the folder where the new `deskNews` is in.

For more information about the app distribution under **Node-Webkit**, please check [How to package and distribute your apps](https://github.com/rogerwang/node-webkit/wiki/How-to-package-and-distribute-your-apps).

##To-do
Customization now can only be done through the code (except the window position and size, which can be configured in the "config/config" file). Settings will be added as new features in the next version(s).

/// <reference path="./templates.d.ts" />

'use strict';

import APPLICATION from 'src/client/app/_app.html!text';

/// main templates
import JLG_SPLASH from 'src/client/app/main/splash/_splash.html!text'; 
import JLG_HEADER from 'src/client/app/main/header/_header.html!text';
import JLG_BANNER from 'src/client/app/main/banner/_banner.html!text'; 
import JLG_WINDOW from 'src/client/app/main/window/_window.html!text'; 
import JLG_FOOTER from 'src/client/app/main/footer/_footer.html!text'; 

/// window templates
import PROJECTS_STORE from 'src/client/app/main/window/projects/_projects.html!text';
import PROJECTS_MODEL from 'src/client/app/main/window/projects/project/_project.html!text';

export const TEMPLATES = {
  APPLICATION,	
  JLG_SPLASH,
  JLG_HEADER,
  JLG_BANNER,
  JLG_WINDOW,
  JLG_FOOTER,
  
  PROJECTS_STORE,
  PROJECTS_MODEL	
}
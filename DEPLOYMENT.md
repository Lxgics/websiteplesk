
# Deployment Guide for Rocketry For Schools Website

This guide will help you deploy the Rocketry For Schools website to a Plesk webhost.

## Building the Application

1. Make sure you have Node.js installed (version 16 or later recommended)
2. Run `npm install` to install all dependencies
3. Run `node build.js` to build the application
4. The built files will be in the `dist` directory

## Deploying to Plesk

1. Log in to your Plesk control panel
2. Navigate to your domain or subdomain where you want to deploy the website
3. Go to the File Manager
4. Upload all files from the `dist` directory to the document root of your domain (usually `httpdocs` or `public_html`)

## Important Configuration for Plesk

Since this is a single-page application (SPA) using React Router, you need to configure your webserver to redirect all requests to index.html:

### For Apache Webserver (most common in Plesk):

The `.htaccess` file is already included in the build and should be uploaded to the root directory. Make sure Apache has `mod_rewrite` enabled.

### For Nginx Webserver:

If your Plesk uses Nginx, add this to your Nginx configuration:

```
location / {
  try_files $uri $uri/ /index.html;
}
```

You can usually add this in Plesk under "Apache & nginx Settings" for your domain.

### For IIS Webserver:

The `web.config` file is already included in the build and should be uploaded to the root directory.

## Testing Your Deployment

After uploading all files:

1. Visit your website's URL
2. Try navigating to different pages
3. Refresh the page on a non-home route to ensure the server configuration is correct

## Troubleshooting

- If you see a 404 error when refreshing a page, your server is not properly configured to redirect requests to index.html
- If styles or scripts are not loading, check that all files from the dist directory were uploaded correctly
- Check the browser console for any errors

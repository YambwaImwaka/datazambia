
# Zambia Insight - Provincial Analytics Dashboard

## Project Overview

Zambia Insight is a comprehensive dashboard application that provides detailed analytics and information about Zambian provinces, economic indicators, financial data, and more.

## Features

- Interactive provincial data visualization
- Real-time economic indicators
- Financial market data
- Commodity price tracking
- User authentication and personalization
- Admin dashboard for content management

## Tech Stack

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase (authentication and database)
- Recharts (data visualization)

## Development Setup

To set up the project for local development:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## Building for Production

To build the project for production:

```sh
# Generate production-ready files
npm run build

# Preview the production build locally
npm run preview
```

## Deployment to CPanel Hosting

To deploy this application on CPanel hosting:

1. **Build the project**:
   ```sh
   npm run build
   ```

2. **Prepare the files**:
   - After the build process completes, you'll have a `dist` folder
   - Create a ZIP file of the entire `dist` folder

3. **Upload to CPanel**:
   - Login to your CPanel account
   - Navigate to File Manager
   - Go to the public_html directory or a subdirectory where you want to deploy
   - Upload and extract the ZIP file

4. **Configure .htaccess**:
   - Create or edit the `.htaccess` file in your root directory
   - Add the following rules to support client-side routing:

   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

5. **Additional CPanel Settings**:
   - If you're deploying to a subdirectory, update the base path in `vite.config.ts`
   - Set up any necessary environment variables in your CPanel hosting environment

## Data Update Frequency

- Economic indicators: Updated quarterly from the World Bank API
- Exchange rates: Updated daily
- Stock market data: Updated daily on business days
- Commodity prices: Updated daily

## Browser Support

This application supports:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Custom Domain Setup

To use a custom domain with this project:

1. Purchase your domain
2. Point your domain's DNS records to your hosting provider
3. Configure the domain in CPanel
4. Update the site's base URL configuration if deploying to a subdirectory

## Need Help?

For assistance with deployment issues or feature requests, please contact the development team.

#!/bin/sh

envsubst '
    ${UI_PORT}
		${USERS_PORT}
		${PRODUCTS_PORT}
		${ORDERS_PORT}
		${BLOGS_PORT}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

exec nginx -g "daemon off;"
FROM node
WORKDIR /app
# as we set WORKDIR so just need '.' instead of '/app'
COPY package.json .

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
        then yarn install; \
        else yarn install --only=production; \
        fi

# copy entire within current dir into /app (. or ./) ('.' depict current dir)
COPY . ./
ENV PORT 3000
EXPOSE $PORT
# it will be executed when runtime
CMD ["node", "index.js"]
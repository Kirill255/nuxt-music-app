# Server

`npm i -D eslint @babel/core @babel/cli @babel/node @babel/preset-env babel-eslint nodemon`

`npm i -D dotenv`

## Tips

```bash
netstat -ano | findstr :3001
  TCP    0.0.0.0:3001           0.0.0.0:0              LISTENING       12768
  TCP    [::]:3001              [::]:0                 LISTENING       12768

tskill 12768 # нам нужен именно этот процесс, т.к. 0.0.0.0:3001 -> localhost:3001, или taskkill 12768
```

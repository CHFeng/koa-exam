## 專案結構
* app.js: entry point
* config.js: 專案環境變數設定檔
* routers: 路由列表
* models: database ORM
* middleware: 路由驗證token的middleware
* db: postgresql connection
* controllers: 參數檢查與回應
* service: 實際業務處理

## Database
使用docker-compose啟用postgresql
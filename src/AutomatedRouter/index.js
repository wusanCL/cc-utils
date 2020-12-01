// 自动化路由

const initRoutes = {
    path: "/",
    name: "app",
    redirect: "/home",
}

class AutomatedRoutes {
    constructor(options) {
        let { routes,final,requireModules } = options || {}
        this.routes = routes || [initRoutes]

        // 路由最终生成后调用
        this.final = final || (()=>{})

        // require函数不能静态提取依赖项    同时也没有浏览器实现了module的createRequire 不然还可以根据用户的路径生成require 对modules的加载路径进行配置  或许要换一个底层依赖  同时耦合性也有点高   可以使用依赖倒置进行优化  待升级
        // /\.\/(([^/]*?)\/)+index\.vue$/
        this.requireModules =  requireModules
    }

    create() {
        let ast = this.resolveModules()
        console.log(ast)
        this.generatorRoutes(ast, this.routes)
        this.final(this.routes)
    }


    generatorRoutes(ast, routes) {
        Object.keys(ast).forEach((key) => {
            try{
                let module = ast[key]
                let comp = this.requireModules(module.filePath + "/index.vue")
                    .default
    
                const router = Object.assign(
                    {},
                    {
                        path: "/" + module.name,
                        component: comp,
                        name: module.name,
                        props: true,
                    },
                    comp._router || {}
                )
                let parent = routes
                if (comp._openChildren) {
                    parent = router.children = []
                }
                routes.push(router)
    
                if (Object.keys(module.children).length > 0) {
                    this.generatorRoutes(module.children, parent)
                }
            } catch(err){
                
            }

        })
    }

    // paths  ---》 paths ast
    resolveModules() {
        let paths = [].concat(this.requireModules.keys())
        let ast = {}

        let handle = (path, source) => {
            let parent
            path.forEach((i) => {
                let data = parent ? parent.children : source
                if (!data[i]) {
                    data[i] = {
                        name: (parent ? parent.name : "") + i,
                        parent,
                        filePath: (parent ? parent.filePath : ".") + "/" + i,
                        children: {},
                    }
                }
                parent = data[i]
            })
            return source
        }

        paths.forEach((path) => {
            path = path.split("/").filter((i) => i !== "." && i !== "index.vue")
            handle(path, ast)
        })

        return ast
    }
}

export default  AutomatedRoutes

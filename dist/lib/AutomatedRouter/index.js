// 自动化路由
const initRoutes = {
    path: "/",
    name: "app",
    redirect: "/home",
}

class AutomatedRoutes {
    constructor(options) {
        let { routes, requireModules,final } = options
        this.routes = routes || [initRoutes]
        this.final = final || ((routes)=>{
            routes.push({
                path: "/404",
                component: () => import("../views/404"),
            })
        })
        this.requireModules =
            requireModules ||
            require.context("../views", true, /\.\/(([^/]*?)\/)+index\.vue$/)
    }

    create() {
        let ast = this.resolveModules()
        this.generatorRoutes(ast, this.routes)
        this.final(this.routes)
    }

    generatorRoutes(ast, routes) {
        Object.keys(ast).forEach((key) => {
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
                this.generator(module.children, parent)
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

export default AutomatedRoutes

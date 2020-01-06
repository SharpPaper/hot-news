import VerticalPull from './VerticalPull'
const version = '1.0.0';
const install = function(Vue,config={}){
    if(install.installed) return;

    Vue.component(VerticalPull.name,VerticalPull);

}

if(typeof window !== 'undefined' && window.Vue){
    install(window.Vue);
};

export default {
    install,
    version,
    VerticalPull
};
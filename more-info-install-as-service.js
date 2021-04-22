var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'fim-more-info',
  description: 'Service to retrieve additional info for some fim sites',
  script: 'D:\\Projects\\Applications\\github\\fim-more-info\\more-info.js',
  nodeOptions: [
    '--harmony',
    '--max_old_space_size=4096'
  ]
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();
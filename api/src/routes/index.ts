import post from './post';
import user from './user';
import product from './product';
import auth from './auth'
function route(app){
    app.use('/api/auth', auth);
    app.use('/api/user', user);
    app.use('/api/post', post);
    app.use('/api/product', product);
}

export default route;
// Ponto de entrada da aplicação: inicia os módulos globais e o roteador.
import { iniciarMenu } from './modulos/menu.js';
import { iniciarAparencia } from './modulos/aparencia.js';
import { iniciarRoteador } from './router.js';

iniciarMenu();
iniciarAparencia();
iniciarRoteador();

<template>
    <div class="hidden">

        <vs-sidebar absolute hover-expand reduce v-model="active" open>
            <template #logo>

            </template>
            <vs-sidebar-item id="crearUsuario">
                <template #icon>
                    <span class="material-icons-outlined">
                        person_add
                    </span>
                </template>
                Crear usuario
            </vs-sidebar-item>
            <vs-sidebar-item id="listaUsuario">
                <template #icon>
                    <span class="material-icons-outlined">
                        contacts
                    </span>
                </template>
                Lista de Usuarios
            </vs-sidebar-item>
            <vs-sidebar-item id="crearProductos">
                <template #icon>
                    <span class="material-icons-outlined">
                        local_offer
                    </span>
                </template>
                Crear Productos
            </vs-sidebar-item>
            <vs-sidebar-item id="listaProducto">
                <template #icon>
                    <span class="material-icons-outlined">
                        local_offer
                    </span>
                </template>
                Lista Producto
            </vs-sidebar-item>
            <vs-sidebar-item id="crearSubasta">
                <template #icon>
                    <span class="material-icons-outlined">
                        local_offer
                    </span>
                </template>
                Crear Subasta
            </vs-sidebar-item>
            <vs-sidebar-item id="listaSubasta">
                <template #icon>
                    <span class="material-icons-outlined">
                        gavel
                    </span>
                </template>
                Lista de subasta
            </vs-sidebar-item>
            <div @click="cerrarSesion">
                <vs-sidebar-item id="cerrarSesion">
                    <template #icon>
                        <span class="material-icons-outlined">
                            logout
                        </span>
                    </template>
                    Cerrar Sesion
                </vs-sidebar-item>
            </div>
        </vs-sidebar>
        <div v-if="active == 'crearUsuario'">
            <CrearUsuario />
        </div>
        <div v-if="active == 'listaUsuario'">
            <ListaUsuario />

        </div>
        <div v-if="active == 'crearProductos'">
            <CrearProducto />

        </div>
        <div v-if="active == 'listaProducto'">
            <ListaProducto/>

        </div>
        <div v-if="active == 'listaSubasta'">
            <ListaSubastasAdmin />
        </div>
        <div v-if="active=='crearSubasta'">
            <CrearSubasta/>
        </div>

    </div>
</template>
<script>
import CrearProducto from '@/components/CrearProducto.vue';
import CrearUsuario from '@/components/CrearUsuario.vue';
import ListaUsuario from '@/components/ListaUsuario.vue';
import ListaSubastasAdmin from '@/components/ListaSubastasAdmin.vue';
import CrearSubasta from '@/components/CrearSubasta.vue';
import ListaProducto from '@/components/ListaProducto.vue';

export default {
    data: () => ({
        active: "crearUsuario",
    }),
    beforeMount() {

        /* if (this.$store.state.usuarioLogeado.userName == null) {
            this.$router.push({ path: '/' })
        } */
    },
    components: { CrearUsuario, ListaUsuario, CrearProducto, ListaSubastasAdmin, CrearSubasta, ListaProducto },
    methods: {
        cerrarSesion() {
            this.$router.push({ path: '/' })
        }
    },
}
</script>

<style>
.hidden {
    display: flex;

    justify-content: center;
}
</style>
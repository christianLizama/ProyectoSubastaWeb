<template>
    <div  class="contenedor">
        <div @mouseover="hover = true" @mouseleave="hover = false">
            <vs-sidebar color="#62B0F6" absolute hover-expand reduce v-model="active" open>
                <template #logo>
                    <span class="material-icons-outlined">
                        account_circle
                    </span>
                    <p v-if="hover">{{ userName }}</p>

                </template>
                <vs-sidebar-item id="subastas">
                    <template #icon>
                        <span class="material-icons-outlined">
                            gavel
                        </span>
                    </template>
                    Ver Subastas
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
        </div>
        <div class="contenedor" v-if="active == 'subastas'">
            <Subasta bandera="martillero" />
        </div>
        <div class="contenedor2"  v-if="active == 'listaSubasta'">
            <ListaSubastasAdmin />
        </div>
        <div class="contenedor2"  v-if="active == 'crearSubasta'">
            <CrearSubasta />
        </div>
    </div>
</template>

<script>
import Subasta from "@/components/Subasta.vue"
import ListaSubastasAdmin from '@/components/ListaSubastasAdmin.vue';
import CrearSubasta from '@/components/CrearSubasta.vue';
export default {

    data() {
        return {

            userName: this.$store.state.usuarioLogeado.nombreUsuario,
            active: "subastas",
            hover: false,
        };
    },

    beforeMount() {

        /* if(this.$store.state.usuarioLogeado.userName==null){
            this.$router.push({ path: '/' })
        } */
    },

    methods: {
        cerrarSesion() {
            this.$router.push({ path: '/' })
        },

    },
    components: {
        Subasta, ListaSubastasAdmin, CrearSubasta
    }


};
</script>

<style  scoped>
.contenedor {
    display: flex;
    flex-direction: column;
}
.contenedor2 {
    display: flex;
    
    justify-content: center;
}
</style>
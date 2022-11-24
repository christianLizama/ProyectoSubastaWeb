<template>
    <div>
        <div @mouseover="hover = true" @mouseleave="hover = false">
            <vs-sidebar color="#62B0F6"  absolute hover-expand reduce v-model="active" open>
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
                    Ver Productos
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
        <div v-if="active=='subastas'">
            <Subasta
            bandera="martillero"
            />
            <Chat/>
        </div>
    </div>
</template>

<script>
import Subasta from "@/components/Subasta.vue"
import Chat from '../components/Chat.vue';
export default {
    
    data() {
        return {
            
            userName: this.$store.state.usuarioLogeado.userName,
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
    components:{
        Subasta,Chat
    }
        

};
</script>

<style  scoped>
.hidden {
    display: flex;
    flex-direction: column;
}

</style>
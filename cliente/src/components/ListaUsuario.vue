<template>
    <div class="hidden">
        <h3>Lista de usuarios</h3>
        <vs-row justify="center">
            <vs-col w="9">
                <div v-for="(item, index) in usuarios" :key="index">
                    <vs-button flat :active="true" class="boton">
                        <span class="material-icons-outlined">
                            account_circle
                        </span>

                        <p>Usuario: {{ item.userName }} [{{ item.rol }}]</p>

                    </vs-button>

                </div>


            </vs-col>
            <vs-col w="3">
                <div v-for="(item, index) in usuarios" :key="index">
                    <vs-button @click="eliminarUsuario(item._id)" color="#DE6D83">
                        <span class="material-icons-outlined">
                            delete
                        </span>
                    </vs-button>
                </div>

            </vs-col>

        </vs-row>

    </div>
</template>

<script>

export default {

    data() {
        return {
            usuarios: []
        };
    },
    created() {
        this.listarUsuarios();
    },

    methods: {
        listarUsuarios() {
            this.axios.get(this.$store.getters.getLocalhost+'/usuario')
                .then((res) => {
                    this.usuarios = res.data

                })
                .catch((e) => {
                    console.log(e.response);
                })
        },
        eliminarUsuario(id) {
            this.axios.delete(this.$store.getters.getLocalhost+"/usuario/" + id)
                .then(res => {
                    const index = this.usuarios.findIndex(item => item._id == res.data._id)
                    this.usuarios.splice(index, 1)
                    this.openNotification("success", "Eliminado", "Se borro con exito")

                })
                .catch(e => {
                    this.openNotification("danger", "Error", "El elemento no existe.")

                })
        },
        openNotification(color, titulo, texto) {
            const noti = this.$vs.notification({
                sticky: true,
                color,
                position: "top-right",
                title: titulo,
                text: texto
            })
        }

    },
};
</script>

<style scoped>
.hidden {
    display: flex;
    flex-direction: column;
}

h3 {
    text-align: center;
}

.datos {
    text-align: left;
}

.boton {

    height: 40px;
    width: 300px;
}
</style>
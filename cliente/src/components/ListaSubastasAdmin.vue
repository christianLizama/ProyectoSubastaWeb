<template>
    <div class="hidden">
        <h3>Lista de subastas</h3>
        <vs-row justify="center">
            <vs-col w="9">
                <div v-for="(item, index) in subastas" :key="index">
                    <vs-button flat :active="true" class="boton">
                        <span class="material-icons-outlined">
                            local_offer
                        </span>

                        <p>Nombre: {{ item.producto.nombreProducto }} [{{ item.duracion }}]</p>

                    </vs-button>

                </div>


            </vs-col>
            <vs-col w="3">
                <div v-for="(item, index) in subastas" :key="index">
                    <vs-button @click="eliminarsubasta(item._id)" color="#DE6D83">
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
            subastas: []
        };
    },
    created() {
        this.listarsubastas();
    },

    methods: {
        listarsubastas() {
            this.axios.get('/subasta')
                .then((res) => {
                    this.subastas = res.data
                    this.subastas.forEach(element => {
                    });

                })
                .catch((e) => {
                    console.log(e.response);
                })
        },
        eliminarsubasta(id) {
            this.axios.delete("/subasta/" + id)
                .then(res => {
                    const index = this.subastas.findIndex(item => item._id == res.data._id)
                    this.subastas.splice(index, 1)
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
    justify-content: center;
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
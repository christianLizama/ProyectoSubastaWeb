<template>
    <div class="hidden">

        <div class="titulo">
            <h3>Crear Subasta</h3>
        </div>

        <vs-row justify="center">
            <div class="contenedor">
                <vs-select v-model="value" v-if="(productos.length > 0)" label="Seleccione producto">
                    <vs-option v-for="(item, index) in productos" :key="index" :label="item.nombreProducto"
                        :value="item._id">
                        {{ item.nombreProducto }}
                    </vs-option>
                </vs-select>
                <hr>
                <vs-button @click="agregarsubasta">Crear subasta</vs-button>
            </div>


            <vs-row>

            </vs-row>
        </vs-row>





    </div>
</template>

<script>
export default {
    data() {

        return {
            value: "",
            subasta: {
                ultimaPuja: null,
                duracion: null,
                estado: true,
                producto: null,
                chat: {
                    pujas:[]
                }
            },
            productos: []
        }
    },
    components: {

    },
    created() {
        this.listarProdutos();
    },
    methods: {
        agregarsubasta() {

            this.axios.get('/producto/' + this.value)
                .then(res => {
                    this.subasta.producto = res.data
                    this.value=""
                    this.crearSubasta()
                })
                .catch((e) => {
                    console.log(e);
                })


            console.log(this.subasta)


        },
        crearSubasta() {
            this.axios.post('/nuevo-subasta', this.subasta)
                .then(res => {
                    this.subasta.producto = null
                    this.subasta.duracion = null
                    this.openNotification("success", "Exito", "Nueva subasta agregado")
                })
                .catch((e) => {
                    console.log(e);

                })
        },
        listarProdutos() {
            this.axios.get('/producto')
                .then((res) => {
                    this.productos = res.data
                })
                .catch((e) => {
                    console.log(e.response);
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

}
</script>

<style scoped>
.hidden {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.vs-input-parent {
    padding: 10px;
}

.rol {
    padding: 9px 0 0 0;
}

.contenedor {
    display: flex;
    flex-direction: column;
}
</style>
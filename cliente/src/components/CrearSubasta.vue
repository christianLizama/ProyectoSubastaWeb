<template>
    <div class="hidden">

        <div class="titulo">
            <h3>Crear Subasta</h3>
        </div>

        <vs-row justify="center">
            <div class="contenedor">
                <vs-select v-model="value" v-if="(productos.length > 0)" label="Seleccione producto">
                    <vs-option v-for="(item, index) in putProductos" :key="index" :label="item.nombreProducto"
                        :value="item._id">

                        {{ item.nombreProducto }}

                    </vs-option>
                </vs-select>
                <p v-else>No hay productos para crear subastas.</p>
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
                    pujas: []
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
    computed:{

        putProductos() {
            this.listarProdutos()
            return this.productos.filter(pro => pro.estado != true)
        }


    },
    methods: {
        agregarsubasta() {

            this.axios.get('/producto/' + this.value)
                .then(res => {
                    res.data.estado = true
                    this.subasta.producto = res.data
                    this.value = ""
                    this.crearSubasta()
                    this.actualizarProducto(res.data)

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
                    const result = res.data.filter(pro => pro.estado != true);
                    this.productos = result
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
        },
        actualizarProducto(producto) {
            console.log("producot")
            console.log(producto)


            this.axios.put('/producto/' + producto._id, producto)
                .then((res) => {

                    const result = res.data.filter(pro => pro.estado != true);
                    this.productos = result
                })
                .catch((e) => {
                    console.log(e.response);
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
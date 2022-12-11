<template>
    <div>

    </div>
  
</template>

<script>
export default {
    data() {
        return {
           
        }
    },
    mounted(){
        const loading = this.$vs.loading({
            text: 'Reconectando con el servidor'
        })
        setTimeout(() => {
            loading.close()
            this.$store.state.conexion = true;
        },7000)
    }
}
</script>

<style>

</style>
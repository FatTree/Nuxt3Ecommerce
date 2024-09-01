<script setup>
const error = useError();

const handleError = () => {
    clearError({
        redirect: '/',
    });
};

</script>
<template>
    <div>
        <h1>Error Page:{{ error.statusCode }}</h1>
        <div>{{ error.statusMessage }} 😮</div>
        <NuxtLink to="/" >Back to the INDEX</NuxtLink>
    </div>
</template>

<style>
    
</style>
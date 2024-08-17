<script lang="ts">
  import { createTooltip, melt } from '@melt-ui/svelte';
  import { fade } from 'svelte/transition';
	import Icon from '@iconify/svelte';

  export let url : string;
  export let icon : string;
  export let hover_color : string;
  export let title : string;
	
  let color = "white";
  let hover = false;
  
  $: color = hover ? hover_color : "white";


  // Tooltip
  const {
    elements: { trigger, content, arrow },
    states: { open },
  } = createTooltip({
    positioning: {
      placement: 'bottom',
    },
    openDelay: 1,
    closeDelay: 1,
    closeOnPointerDown: false,
    forceVisible: true,
  });
</script>


<a href={url} target="_blank"
  on:mouseenter={() => {hover = true}}
  on:mouseleave={() => {hover = false}}
  use:melt={$trigger}
>
  <Icon {icon} font-size={50} style="color: {color};" />
</a>

{#if $open}
  <div
    use:melt={$content}
    transition:fade={{ duration: 100 }}
    class="">
      <div use:melt={$arrow} />
      <p class="" style="color: {color};">{title}</p>
  </div>
{/if}

<style>
  a {
    transition: .5s;
  }
  a:hover {
    transform: scale(1.2);
  }
</style>

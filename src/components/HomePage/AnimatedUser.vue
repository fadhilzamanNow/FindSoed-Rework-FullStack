<template>
    <span>{{ displayValue }}</span>
  </template>
  
  <script setup>
  import { reactive, computed, watch, onUnmounted } from 'vue';
  import { gsap } from 'gsap';
  
  // 1. Define Props
  const props = defineProps({
    value: {
      type: Number, // Explicitly type the prop
      required: true,
      default: 0
    }
  });
  
  // 2. Create a reactive object for GSAP to tween
  //    GSAP works well tweening properties of an object.
  const tweenTarget = reactive({
    number: props.value
  });
  
  // 3. Create a computed property for the display value
  //    It automatically updates when tweenTarget.number changes.
  //    Using Math.ceil() as in your original example. Use Math.round() if preferred.
  const displayValue = computed(() => Math.ceil(tweenTarget.number));
  
  // Store the active tween instance for potential cleanup
  let currentTween = null;
  
  // 4. Watch the prop for changes
  watch(() => props.value, (newValue) => {
    // If a previous animation is running, kill it to avoid conflicts
    if (currentTween) {
      currentTween.kill();
    }
    // Start the GSAP animation
    currentTween = gsap.to(tweenTarget, { // Target the reactive object
      duration: 0.6, // Animation duration (adjust as needed)
      ease: 'power2.out', // GSAP easing function (adjust as needed)
      number: newValue, // Animate the 'number' property to the new prop value
      onComplete: () => {
        currentTween = null; // Clear the reference when animation finishes
      }
      // No onUpdate needed! The computed 'displayValue' handles updates automatically.
    });
  }, { immediate: false }); // immediate: false prevents running on initial mount if value is already set
  
  // 5. Cleanup: Kill tween if component is unmounted mid-animation
  onUnmounted(() => {
    if (currentTween) {
      currentTween.kill();
    }
  });
  
  // Ensure the initial value is set (reactive already initializes it)
  // If you needed immediate watch fire, you could remove the reactive init
  // and rely on watch { immediate: true }
  
  </script>
  
  <style scoped>
  /* Optional: Add styles */
  span {
    display: inline-block;
    min-width: 1em; /* Helps prevent layout shifts */
    text-align: center;
  }
  </style>
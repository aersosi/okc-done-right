export function log_allScrollEvents() {
  // List of all relevant event types
  const scrollEvents = [
    'scroll',         // Traditional scrolling
    'wheel',          // Modern wheel events (trackpad/mouse)
    'mousewheel',     // Legacy mouse wheel
    'DOMMouseScroll', // Firefox legacy
    'touchstart',     // Trackpad touch gestures
    'touchmove',
    'touchend',
    'keydown'         // Keyboard scrolling (space/arrows)
  ];

  // Generic event handler with detailed logging
  function handleEvent(event) {
    const logData = {
      eventType: event.type,
      target: event.target?.tagName,
      timeStamp: event.timeStamp.toFixed(2),
      details: {}
    };

    // Add event-specific details
    switch(event.type) {
      case 'wheel':
        logData.details = {
          deltaX: event.deltaX,
          deltaY: event.deltaY,
          deltaZ: event.deltaZ,
          deltaMode: event.deltaMode,
          ctrlKey: event.ctrlKey,
          shiftKey: event.shiftKey,
          pointerType: event.pointerType
        };
        break;

      case 'touchstart':
      case 'touchmove':
      case 'touchend':
        logData.details = {
          touches: event.touches.length,
          changedTouches: event.changedTouches.length,
          coordinates: Array.from(event.touches).map(t => ({
            x: t.clientX,
            y: t.clientY
          }))
        };
        break;

      case 'keydown':
        logData.details = {
          key: event.key,
          code: event.code
        };
        break;

      case 'scroll':
        logData.details = {
          scrollX: window.scrollX,
          scrollY: window.scrollY,
          targetScrollTop: event.target.scrollTop,
          targetScrollLeft: event.target.scrollLeft
        };
        break;
    }

    console.log('Scroll Event:', logData);
  }

  // Add event listeners with passive where appropriate
  const passiveOptions = { passive: true, capture: true };

  scrollEvents.forEach(eventType => {
    const usePassive = ['touchstart', 'touchmove', 'wheel'].includes(eventType);
    window.addEventListener(
      eventType,
      handleEvent,
      usePassive ? passiveOptions : true
    );
  });

  // Return cleanup function
  return () => {
    scrollEvents.forEach(eventType => {
      window.removeEventListener(eventType, handleEvent, true);
    });
  };
}
<template>
  <div>
    <svg
      viewBox="0 0 201 201"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="full"
        class="tertiary"
        d="M82.6306 117.99L82.6306 200.327H164.968V117.99L164.968 35.6532H82.6306L0.293488 35.6532L0.293488 117.99H82.6306Z"
      />
      <path
        id="empty"
        class="stroke"
        d="M32.2565 0.327469L200.293 0.327469L200.293 168.364H114.594L114.594 86.0273H32.2565L32.2565 0.327469ZM196.931 3.69023L35.6192 3.69023L35.6192 82.6646H117.956L117.956 165.002H196.931L196.931 3.69023Z"
      />
      <g
        id="lines"
        class="stroke"
      >
        <path
          d="M65.3965 199.436H70.407L70.407 127.978H65.3965L65.3965 199.436Z"
        />
        <path
          d="M52.6348 199.453H57.6453L57.6453 127.995H52.6348L52.6348 199.453Z"
        />
        <path d="M39.89 199.436H44.9005L44.9005 127.978H39.89L39.89 199.436Z" />
        <path
          d="M27.1451 199.436H32.1556L32.1556 127.978H27.1451L27.1451 199.436Z"
        />
        <path
          d="M14.4002 199.453H19.4107L19.4107 127.995H14.4002L14.4002 199.453Z"
        />
        <path
          d="M1.80671 199.436H6.66589L6.66589 127.978H1.80671L1.80671 199.436Z"
        />
      </g>
    </svg>
  </div>
</template>

<style scoped lang="scss">
.tertiary {
  fill: var(--tertiary);
  transition: fill 0.15s linear;
}

.stroke {
  fill: var(--primary-dark);
  transition: fill 0.15s linear;
}

.dark-scheme {
  .stroke {
    fill: var(--stroke);
  }
}
</style>

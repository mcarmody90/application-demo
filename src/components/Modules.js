import React from 'react';
import Module from './Module';
import modules from '../fixtures/modules';
import user from '../fixtures/user';

const Modules = () => (
  <div className='module-list'>
    {
      modules.map((module) => (
        <Module key={module.number} {...module} {...user} />
      ))
    }
  </div>
);

export default Modules;

// import React from 'react';
// import Module from './Module';
// import modules from '../fixtures/modules';
// import user from '../fixtures/user';

// const Modules = () => (
//   <div className='module'>
//     Modules:
//     {
//       modules.map((module) => (user[0].moduleComplete[module.number - 1] > 10) || (module.number === 1) ? (
//         <Module key={module.number} {...module} {...user} />
//       ) : (
//         <div key={module.number} className='module'>
//           <h1>Module {module.number}</h1>
//           <p>Module Locked</p>
//         </div>
//       ))
//     }
//   </div>
// );

// export default Modules;
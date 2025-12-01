import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/hackathon-bookProject/__docusaurus/debug',
    component: ComponentCreator('/hackathon-bookProject/__docusaurus/debug', 'dd8'),
    exact: true
  },
  {
    path: '/hackathon-bookProject/__docusaurus/debug/config',
    component: ComponentCreator('/hackathon-bookProject/__docusaurus/debug/config', 'a17'),
    exact: true
  },
  {
    path: '/hackathon-bookProject/__docusaurus/debug/content',
    component: ComponentCreator('/hackathon-bookProject/__docusaurus/debug/content', '821'),
    exact: true
  },
  {
    path: '/hackathon-bookProject/__docusaurus/debug/globalData',
    component: ComponentCreator('/hackathon-bookProject/__docusaurus/debug/globalData', '004'),
    exact: true
  },
  {
    path: '/hackathon-bookProject/__docusaurus/debug/metadata',
    component: ComponentCreator('/hackathon-bookProject/__docusaurus/debug/metadata', 'bcb'),
    exact: true
  },
  {
    path: '/hackathon-bookProject/__docusaurus/debug/registry',
    component: ComponentCreator('/hackathon-bookProject/__docusaurus/debug/registry', '4f3'),
    exact: true
  },
  {
    path: '/hackathon-bookProject/__docusaurus/debug/routes',
    component: ComponentCreator('/hackathon-bookProject/__docusaurus/debug/routes', 'cfb'),
    exact: true
  },
  {
    path: '/hackathon-bookProject/login',
    component: ComponentCreator('/hackathon-bookProject/login', '31d'),
    exact: true
  },
  {
    path: '/hackathon-bookProject/signup',
    component: ComponentCreator('/hackathon-bookProject/signup', 'a4d'),
    exact: true
  },
  {
    path: '/hackathon-bookProject/docs',
    component: ComponentCreator('/hackathon-bookProject/docs', '3f5'),
    routes: [
      {
        path: '/hackathon-bookProject/docs',
        component: ComponentCreator('/hackathon-bookProject/docs', '222'),
        routes: [
          {
            path: '/hackathon-bookProject/docs',
            component: ComponentCreator('/hackathon-bookProject/docs', 'e92'),
            routes: [
              {
                path: '/hackathon-bookProject/docs/category/2-ros-2-robot-operating-system',
                component: ComponentCreator('/hackathon-bookProject/docs/category/2-ros-2-robot-operating-system', '104'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/hackathon-bookProject/docs/category/3-robot-simulation',
                component: ComponentCreator('/hackathon-bookProject/docs/category/3-robot-simulation', '601'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/hackathon-bookProject/docs/category/5-vision-language-action-vla',
                component: ComponentCreator('/hackathon-bookProject/docs/category/5-vision-language-action-vla', '79e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/hackathon-bookProject/docs/category/6-humanoid-robotics',
                component: ComponentCreator('/hackathon-bookProject/docs/category/6-humanoid-robotics', '7d5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/hackathon-bookProject/docs/category/7-hardware-setup',
                component: ComponentCreator('/hackathon-bookProject/docs/category/7-hardware-setup', '6cf'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/hackathon-bookProject/docs/category/physical-ai',
                component: ComponentCreator('/hackathon-bookProject/docs/category/physical-ai', '239'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/hackathon-bookProject/docs/hardware/',
                component: ComponentCreator('/hackathon-bookProject/docs/hardware/', '635'),
                exact: true
              },
              {
                path: '/hackathon-bookProject/docs/hardware/conclusion/',
                component: ComponentCreator('/hackathon-bookProject/docs/hardware/conclusion/', '33d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/hackathon-bookProject/docs/hardware/edge-computing-jetson',
                component: ComponentCreator('/hackathon-bookProject/docs/hardware/edge-computing-jetson', '2e6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/hackathon-bookProject/docs/hardware/introduction/',
                component: ComponentCreator('/hackathon-bookProject/docs/hardware/introduction/', '615'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/hackathon-bookProject/docs/hardware/lab-infrastructure',
                component: ComponentCreator('/hackathon-bookProject/docs/hardware/lab-infrastructure', '005'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/hackathon-bookProject/docs/hardware/sensors-actuators',
                component: ComponentCreator('/hackathon-bookProject/docs/hardware/sensors-actuators', 'b8a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/hackathon-bookProject/docs/hardware/workstation-requirements',
                component: ComponentCreator('/hackathon-bookProject/docs/hardware/workstation-requirements', 'ac2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/hackathon-bookProject/docs/humanoid-robotics/',
                component: ComponentCreator('/hackathon-bookProject/docs/humanoid-robotics/', '5ad'),
                exact: true
              },
              {
                path: '/hackathon-bookProject/docs/humanoid-robotics/bipedal-locomotion',
                component: ComponentCreator('/hackathon-bookProject/docs/humanoid-robotics/bipedal-locomotion', '5a7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/hackathon-bookProject/docs/humanoid-robotics/conclusion/',
                component: ComponentCreator('/hackathon-bookProject/docs/humanoid-robotics/conclusion/', '72d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/hackathon-bookProject/docs/humanoid-robotics/human-robot-interaction',
                component: ComponentCreator('/hackathon-bookProject/docs/humanoid-robotics/human-robot-interaction', '677'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/hackathon-bookProject/docs/humanoid-robotics/introduction/',
                component: ComponentCreator('/hackathon-bookProject/docs/humanoid-robotics/introduction/', 'c6a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/hackathon-bookProject/docs/humanoid-robotics/kinematics-dynamics',
                component: ComponentCreator('/hackathon-bookProject/docs/humanoid-robotics/kinematics-dynamics', 'e3d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/hackathon-bookProject/docs/humanoid-robotics/manipulation-grasping',
                component: ComponentCreator('/hackathon-bookProject/docs/humanoid-robotics/manipulation-grasping', '09a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/hackathon-bookProject/docs/intro',
                component: ComponentCreator('/hackathon-bookProject/docs/intro', '7ee'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/hackathon-bookProject/docs/physical-ai/',
                component: ComponentCreator('/hackathon-bookProject/docs/physical-ai/', 'bcd'),
                exact: true
              },
              {
                path: '/hackathon-bookProject/docs/physical-ai/conclusion/',
                component: ComponentCreator('/hackathon-bookProject/docs/physical-ai/conclusion/', 'ac7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/hackathon-bookProject/docs/physical-ai/core-principles/',
                component: ComponentCreator('/hackathon-bookProject/docs/physical-ai/core-principles/', 'ccf'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/hackathon-bookProject/docs/physical-ai/digital-to-physical-transition/',
                component: ComponentCreator('/hackathon-bookProject/docs/physical-ai/digital-to-physical-transition/', '9f3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/hackathon-bookProject/docs/physical-ai/introduction/',
                component: ComponentCreator('/hackathon-bookProject/docs/physical-ai/introduction/', 'a0a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/hackathon-bookProject/docs/ros2/',
                component: ComponentCreator('/hackathon-bookProject/docs/ros2/', 'ad0'),
                exact: true
              },
              {
                path: '/hackathon-bookProject/docs/ros2/communication-patterns/',
                component: ComponentCreator('/hackathon-bookProject/docs/ros2/communication-patterns/', '965'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/hackathon-bookProject/docs/ros2/conclusion/',
                component: ComponentCreator('/hackathon-bookProject/docs/ros2/conclusion/', '5ee'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/hackathon-bookProject/docs/ros2/core-architecture/',
                component: ComponentCreator('/hackathon-bookProject/docs/ros2/core-architecture/', '986'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/hackathon-bookProject/docs/ros2/introduction/',
                component: ComponentCreator('/hackathon-bookProject/docs/ros2/introduction/', '154'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/hackathon-bookProject/docs/ros2/python-integration-rclpy/',
                component: ComponentCreator('/hackathon-bookProject/docs/ros2/python-integration-rclpy/', '05e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/hackathon-bookProject/docs/ros2/urdf/',
                component: ComponentCreator('/hackathon-bookProject/docs/ros2/urdf/', '193'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/hackathon-bookProject/docs/simulation/',
                component: ComponentCreator('/hackathon-bookProject/docs/simulation/', '18e'),
                exact: true
              },
              {
                path: '/hackathon-bookProject/docs/simulation/conclusion/',
                component: ComponentCreator('/hackathon-bookProject/docs/simulation/conclusion/', 'b18'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/hackathon-bookProject/docs/simulation/introduction/',
                component: ComponentCreator('/hackathon-bookProject/docs/simulation/introduction/', '826'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/hackathon-bookProject/docs/simulation/platforms/',
                component: ComponentCreator('/hackathon-bookProject/docs/simulation/platforms/', '547'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/hackathon-bookProject/docs/simulation/sensor-simulation/',
                component: ComponentCreator('/hackathon-bookProject/docs/simulation/sensor-simulation/', '9ba'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/hackathon-bookProject/docs/vla/',
                component: ComponentCreator('/hackathon-bookProject/docs/vla/', '723'),
                exact: true
              },
              {
                path: '/hackathon-bookProject/docs/vla/conclusion/',
                component: ComponentCreator('/hackathon-bookProject/docs/vla/conclusion/', '114'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/hackathon-bookProject/docs/vla/introduction/',
                component: ComponentCreator('/hackathon-bookProject/docs/vla/introduction/', '72b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/hackathon-bookProject/docs/vla/llm-role',
                component: ComponentCreator('/hackathon-bookProject/docs/vla/llm-role', '2ed'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/hackathon-bookProject/docs/vla/pipeline',
                component: ComponentCreator('/hackathon-bookProject/docs/vla/pipeline', 'c94'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/hackathon-bookProject/',
    component: ComponentCreator('/hackathon-bookProject/', 'be2'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];

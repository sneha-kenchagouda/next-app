'use client';
import react from 'react';
import { Grid, Row, Column, Tile} from '@carbon/react';
import { Archive,TrashCan,Search,Document } from '@carbon/icons-react';
import {useRouter} from 'next/navigation';
import './dashboard.scss';



const Dashboard = () => {
    const router = useRouter();
    return (
      <>
      
        <Tile className="tile-design">
          <h1>Dashboard</h1>
        </Tile>
        <Grid>
          <Column sm={4}>
            <h1 className="h1-design">Archive</h1>
            <Tile onClick={() => router.push('/archive')}>
              <Archive size="100" />
            </Tile>
          </Column>
  
          <Column sm={4}>
            <h1 className="h1-design">Delete</h1>
            <Tile onClick={() => router.push('/products')}>
              <TrashCan size="100" />
            </Tile>
          </Column>
  
          <Column sm={4}>
            <h1 className="h1-design">Browse</h1>
            <Tile onClick={() => router.push('/sharedcomponents')}>
              <Search size="100" />
            </Tile>
          </Column>
  
          <Column sm={4}>
            <h1 className="h1-design">Restore</h1>
            <Tile>
              <Document size="100" />
            </Tile>
          </Column>
        </Grid>
        </>

    );
  };
  
  export default Dashboard;
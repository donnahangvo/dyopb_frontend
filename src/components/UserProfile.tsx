import * as React from 'react';
import { styled } from '@mui/system';
import Grid from '@mui/material/Grid';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));


const UserProfile = () => {
    return (
        <div>
            <div className='font-bold p-5 text-2xl'><h1>User Profile</h1></div>
            <div className='p-20'>
        <Grid container spacing={3}>
          <FormGrid item xs={12} md={6}>
            <FormLabel htmlFor="first-name" required>
              First name
            </FormLabel>
            <OutlinedInput
              id="first-name"
              name="first-name"
              type="name"
              placeholder="Jester"
              autoComplete="first name"
              required
            />
          </FormGrid>
          <FormGrid item xs={12} md={6}>
            <FormLabel htmlFor="last-name" required>
              Last name
            </FormLabel>
            <OutlinedInput
              id="last-name"
              name="last-name"
              type="last-name"
              placeholder="Lavorre"
              autoComplete="last name"
              required
            />
          </FormGrid>
          <FormGrid item xs={12}>
            <FormLabel htmlFor="address1" required>
              Address line 1
            </FormLabel>
            <OutlinedInput
              id="address1"
              name="address1"
              type="address1"
              placeholder="Street name and number"
              autoComplete="shipping address-line1"
              required
            />
          </FormGrid>
          <FormGrid item xs={12}>
            <FormLabel htmlFor="address2">Address line 2</FormLabel>
            <OutlinedInput
              id="address2"
              name="address2"
              type="address2"
              placeholder="Apartment, suite, unit, etc. (optional)"
              autoComplete="shipping address-line2"
              required
            />
          </FormGrid>
          <FormGrid item xs={6}>
            <FormLabel htmlFor="city" required>
              City
            </FormLabel>
            <OutlinedInput
              id="city"
              name="city"
              type="city"
              placeholder="New York"
              autoComplete="City"
              required
            />
          </FormGrid>
          <FormGrid item xs={6}>
            <FormLabel htmlFor="state" required>
              State
            </FormLabel>
            <OutlinedInput
              id="state"
              name="state"
              type="state"
              placeholder="NY"
              autoComplete="State"
              required
            />
          </FormGrid>
          <FormGrid item xs={6}>
            <FormLabel htmlFor="zip" required>
              Zip / Postal code
            </FormLabel>
            <OutlinedInput
              id="zip"
              name="zip"
              type="zip"
              placeholder="12345"
              autoComplete="shipping postal-code"
              required
            />
          </FormGrid>
          <FormGrid item xs={6}>
            <FormLabel htmlFor="country" required>
              Country
            </FormLabel>
            <OutlinedInput
              id="country"
              name="country"
              type="country"
              placeholder="United States"
              autoComplete="shipping country"
              required
            />
          </FormGrid>
          <FormGrid item xs={12}>
            <FormControlLabel
              control={<Checkbox name="saveAddress" value="yes" />}
              label="Use this address for payment details"
            />
          </FormGrid>
        </Grid>
        </div>
        </div>
      );
    }

export default UserProfile

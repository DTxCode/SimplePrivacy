import '@testing-library/jest-dom'
import { render, fireEvent, screen } from '@testing-library/svelte'

import Crypto from '../../src/components/Crypto.svelte'

test('test', () => {
    render(Crypto)
})